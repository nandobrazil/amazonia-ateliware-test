def getPreviousDockerImageTag(buildNumber) {
    if (buildNumber > 1) {
        return buildNumber - 1
    } else {
        return ""
    }
}

node {
    def appName = "amazonia-ateliware-web"
    def repositoryUrl = "https://github.com/nandobrazil/amazonia-ateliware-test.git"
    def credentialsId = "7f918541-2f75-45ff-b592-59983d8a36a2"
    def branch = "develop"

    def WORKSPACE = "/var/lib/jenkins/workspace/${appName}"
    def dockerImageTag = env.BUILD_NUMBER
    def previousDockerImageTag = getPreviousDockerImageTag(env.BUILD_NUMBER.toInteger())

    try {
        stage('Clone Repo') {
            // Obter código de um repositório do GitHub
            git url: "${repositoryUrl}",
                credentialsId: "${credentialsId}",
                branch: "${branch}"
        }

        stage('Stop and remove container') {
            // Verifica se o contêiner está em execução antes de parar e remover
            def containerId = sh(returnStdout: true, script: "docker ps -q -f name=${appName}").trim()
            if (containerId) {
                sh "docker stop ${containerId}"
                sh "docker rm ${containerId}"
            }
        }

        stage('Remove previous docker image') {
            // Verifica se a tag da imagem anterior existe antes de removê-la
            if (previousDockerImageTag && sh(returnStdout: true, script: "docker images -q ${appName}:${previousDockerImageTag}").trim()) {
                sh "docker rmi --force ${appName}:${previousDockerImageTag}"
            }
        }

        stage('Build docker') {
            // Construir nova imagem Docker
            dockerImage = docker.build("${appName}:${dockerImageTag}")
        }

        stage('Deploy docker') {
            echo "Docker Image Tag Name: ${dockerImageTag}"
            sh "docker stop ${appName} || true && docker rm ${appName} || true"
            sh "docker run --name ${appName} -d -p 8084:80 ${appName}:${dockerImageTag}"

            // Limpar volumes e outros elementos não utilizados do Docker
            sh "docker system prune --force"
        }
    } catch (e) {
        currentBuild.result = "FAILED"
        throw e
    }
}
