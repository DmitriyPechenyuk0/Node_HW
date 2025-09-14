const moment = require('moment');



let getDate = ()=> console.log(moment().format('YYYY/MM/DD HH:mm:ss'));
// getDate();

let getCurrentWeekday = () => console.log(moment().format('dddd'))
getCurrentWeekday()