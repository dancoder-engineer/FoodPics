
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


  export {assembleData, printFormdata}