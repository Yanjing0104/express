var sqlSentence={}
sqlSentence.insert=function (tablename,obj) {
    let arr=[]
    let sql="insert into "+tablename+" ("
    for (var i in obj){
        sql+= i+','
    }
    sql=sql.slice(0,-1)+') values ('
    for (var i in obj){
        sql+= `?,`
        arr.push(obj[i])
    }
    sql=sql.slice(0,-1)+')'
    let data={
        sql:sql,
        arr:arr
    }
    return data
}
// sqlSentence.insert=function (obj) {
//     let sql="insert into article ("
//     for (var i in obj){
//         sql+= i+','
//     }
//     sql=sql.slice(0,-1)+') values ('
//     for (var i in obj){
//         sql+= `"${obj[i]}",`
//     }
//     sql=sql.slice(0,-1)+')'
//     console.log(sql);
//     return sql
// }
module.exports = sqlSentence;