const detailsRows =(resultArray) => resultArray.map((row) => {
    return {
      id: row.id,
      assetNo: row.assetNo.assetNo ,
      assetYear: row.assetNo.assetYear,
      assetType: row.assetNo.assetType, 
      assetOsVersion:row.assetNo.assetOsVersion,
      assetModel:row.assetNo.assetModel,
      assetBrand: row.assetNo.assetBrand, 
      Firstname: row.ps_no.Firstname,
      dateBorrowed: row.dateBorrowed.replace('T', ' '), 
      assetSerialNumber:row.assetNo.assetSerialNumber,
      dateReturned: (row.dateReturned !== null) ? row.dateReturned.replace('T', ' ') :row.dateReturned,
      duration: (row.dateReturned !== null) ? (new Date(row.dateReturned) - new Date(row.dateBorrowed)) / (1000) : ''
    };
}
)
export default detailsRows