import { useEffect, useState } from 'react';

function UploadYaDisk() {
  const [token, setToken] = useState('y0_AgAAAAAHIXWfAAo_RQAAAADo0BMWpahHdvyzR6mPd2U1u-1LiyJZOKo');
  const [filesArr, setFillesArr] = useState([]);
  const [message, setMessage] = useState('');
 
  function handleChangeFile(e) {
    setMessage('');
    setFillesArr([]);
    
    if (e.target.files.length<1 && e.target.files.length>100)
    {
      alert('Количество файлов превышает лимит от 1 до 100');
    } else{
      setFillesArr(e.target.files);
    }
    
    
  }
  async function uploadFiles() {
    for (let i = 0; i < filesArr.length; i++) {
      let formData = new FormData();
      formData.append('file', filesArr[i]);

      let result = await uploadFile(filesArr[i].name,formData);
      if (result=='ok'){
        setMessage(filesArr[i].name +' - успешно отправлен\n');
      }
      if (result=='error'){
        setMessage(filesArr[i].name +' - ошибка отправки\n');
      }
    }
    
  }
  async function uploadFile(namefile,formData) {
    let url = 'https://cloud-api.yandex.net/v1/disk/resources/upload?path='+namefile;
    
    let response = await fetch(url,{
      method: 'GET',
          headers: {
            Authorization: 'OAuth y0_AgAAAAAHIXWfAADLWwAAAADo0TxNfFOjVvScTZ2XM62e7TYmMUReJXo'
          }
        }
      );
      
    if (response.ok) {         
      let json = await response.json();
      let response2 = await fetch(json.href, {
        method: 'PUT',
        body: formData
        }
      );
      if (response2.ok)
        return 'ok';
      else return 'eror';
      
    }
  }

  return (
    <div className="App">
      <p>{message}</p>
      <input type="file" multiple onChange={handleChangeFile}/>
      <button onClick={()=>uploadFiles()}>Отправить</button>
      
    </div>
  );
}

export default UploadYaDisk;
