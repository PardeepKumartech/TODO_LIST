module.exports = {

    apiRequest : function(method,url,param)
    {
        return new Promise((resolve, reject) =>{

            fetch(url, {
                method: method,
                headers: {},
                body: param
            }) 
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
}