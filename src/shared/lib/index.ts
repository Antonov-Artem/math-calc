export const formatNumber = (num: string) =>
  num.replace(/\d+(\.\d+)?/g, match => {
    let [integerPart, fractionalPart] = match.split('.');

    let formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ',',
    );

    return fractionalPart
      ? `${formattedIntegerPart}.${fractionalPart}`
      : formattedIntegerPart;
  });
