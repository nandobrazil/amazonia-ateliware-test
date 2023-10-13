import {MenuItem, MenuItemCommandEvent} from "primeng/api";

export const IMenu: MenuItem[] = [
  {
    label: 'Faturamento Geral',
    icon: 'pi pi-fw pi-chart-line',
    routerLink: '/faturamento-geral'
  },
  {
    label: 'Nível de Estoque',
    icon: 'pi pi-fw pi-chart-bar',
    routerLink: '/nivel-estoque'
  },
  {
    label: 'Análise de Cliente',
    icon: 'pi pi-fw pi-users',
    routerLink: '/analise-cliente'
  },
  {
    label: 'Análise de Vendedor',
    icon: 'pi pi-fw pi-user',
    routerLink: '/analise-vendedor'
  },
  {
    label: 'Análise de Marcas',
    icon: 'pi pi-fw pi-briefcase',
    routerLink: '/analise-marcas'
  },
  {
    label: 'Análise de Grupos',
    icon: 'pi pi-fw pi-book',
    routerLink: '/analise-grupos'
  },
  {
    label: 'Metas',
    icon: 'pi pi-fw pi-chart-pie',
    routerLink: '/metas'
  },
  {
    label: 'SKU\'s',
    icon: 'pi pi-fw pi-cog',
    routerLink: '/skus'
  },
  {
    label: 'Análise de Cliente por SKU\'s',
    icon: 'pi pi-fw pi-user-plus',
    routerLink: '/analise-cliente-skus'
  },
  {
    separator: true
  },
  {
    label: 'Deslogar-se',
    icon: 'pi pi-fw pi-power-off',
    routerLink: '/auth/logout',
  }
];
