import { useTranslation } from 'react-i18next';

export function usePermissionTranslation() {
  const { t } = useTranslation();

  return {
    menuTitle: t('system.permission.menu.title'),
    actionTitle: t('system.permission.action.title'),

    filedTitle: t('system.permission.title'),
    filedCategory: t('system.permission.category'),
    filedParent: t('system.permission.parent'),
    filedPath: t('system.permission.path'),
    filedDescription: t('system.permission.description'),
  };
}
