function convertOrderState(state) {
  switch (state) {
    case 0:
      return 'utils.processing';
    case 1:
      return 'utils.prepareThePackage';
    case 2:
      return 'utils.transporting';
    case 3:
      return 'utils.preparingForDelivery';
    case 4:
      return 'utils.delivered';
    case 5:
      return 'utils.canceled';
  }
}

function convertTracingState(state) {
  switch (state) {
    case 0:
      return 'utils.importing';
    case 1:
      return 'utils.successfullyImported';
    case 2:
      return 'utils.exporting';
    case 3:
      return 'utils.successfullyExporting';
    case 4:
      return 'utils.transporting';
    default:
      return 'utils.importing'
  }
}

function formatCash(cash) {
  return cash
    .toString()
    .split('')
    .reverse()
    .reduce((total, item, index) =>
      !(index % 3) ? `${item}.${total}` : `${item}${total}`,
    )
    .concat(' VND');
}

export { convertOrderState, convertTracingState, formatCash };
