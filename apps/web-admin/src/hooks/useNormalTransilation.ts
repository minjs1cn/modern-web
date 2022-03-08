import { useTranslation } from 'react-i18next';

export function useNormalTransilation() {
  const { t } = useTranslation();

  return {
    addBtnText: t('btn.add.text'),
    editBtnText: t('btn.edit.text'),
    delBtnText: t('btn.delete.text'),
    saveBtnText: t('btn.save.text'),
    confirmBtnText: t('btn.confirm.text'),
    cancelBtnText: t('btn.cancel.text'),
    closeBtnText: t('btn.close.text'),
    backBtnText: t('btn.back.text'),
    nextBtnText: t('btn.next.text'),

    deleteMessageTitle: t('normal.message.delete.title'),

    editFormTitle: t('normal.form.edit.title'),

    tableActionTitle: t('normal.table.action.title'),
  };
}
