export const countMemberTotalPayroll = (salary?: any) => {
  console.log('salarysss : ', salary);

  const countSalary = salary?.reduce((total: number, num: number) => {
    return total + Math.round(num);
  });

  return countSalary;
};
