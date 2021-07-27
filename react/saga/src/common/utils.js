export default async function fetchSmart(url, configObj) {
  const originObj = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch(url, Object.assign(originObj, configObj)).then(res => {
    return res
  }).catch(function (err) {
    return err
  });
  return response.json();
}
