
    function assembleData(sendingData, kindOfUpload){

        let formData = new FormData()

        for (let i in sendingData) {
          if (i==="avatar" || i==="avpic" || i==="pics" || i.startsWith("capti")) {}
          else { 
              formData.append(kindOfUpload + '['+i+']', sendingData[i])
          } 
      }
      
      

        return formData

  }

  function printFormdata(formData) {
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
  }

  function convertTimeDate(timeDate) {
    let year = timeDate.slice(0,4)
    let month = timeDate.slice(5,7)
    let day = timeDate.slice(8,10)
    let ampm = ""
    let hour = parseInt(timeDate.slice(11,13))
    if (hour > 11) { ampm = "PM" }
    if (hour > 12) { hour -= 12 }
    if (hour === 0) { hour = 12 } 
    let minute = timeDate.slice(14,16)

    let time = month + "/" + day + "/" + year + " at " + hour + ":" + minute + " " + ampm
    return time

  }


  export {assembleData, printFormdata, convertTimeDate}