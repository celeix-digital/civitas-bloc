const domainName = "https://civitasbloc.webflow.io/"
const restrictedRoutes = [
    "/agency/dashboard", "/agency/grants/create-grant", "/organization/dashboard", "/organization/find-grants/grant-locator"
    ,"/agency/grants/approve-grants"
]
const unRestrictedRoutes = ["/organization/login", "/agency/login", "/organization/sign-up", "/agency/sign-up"]
function authCheck() {
    const token = localStorage.getItem("accessToken");
    const currentPath = window.location.pathname;
    console.log("token", token)
    if(token) {
        if(document.getElementById('loginLink') && document.getElementById('signUpLink')) {
        document.getElementById('loginLink').style.display = "none";
        document.getElementById('signUpLink').style.display = "none";
        }
    }
    else {
        if(document.getElementById('logoutLink') && document.querySelector('[fs-modal-element="open"]')) {
        document.querySelector('[fs-modal-element="open"]').style.display = "none";
        document.getElementById('logoutLink').style.display = "none";
        }
    }
    if (!token && restrictedRoutes.indexOf(currentPath) > -1) {
        console.log('1')
        if (currentPath.indexOf('/agency') > -1) {
            window.location.href = `${domainName}agency/login`
        }
        if (currentPath.indexOf('/organization') > -1) {
            window.location.href = `${domainName}organization/login`
        }
    }
    else if (token && unRestrictedRoutes.indexOf(currentPath) > -1) {
        console.log('2')
        if (currentPath.indexOf('/agency') > -1) {
            window.location.href = `${domainName}agency/dashboard`
        }
        if (currentPath.indexOf('/organization') > -1) {
            window.location.href = `${domainName}organization/dashboard`
        }
    }
}
    setTimeout(()=>{
        authCheck();
       
        if(document.getElementById('logoutLink')) {
            document.querySelector('#logoutLink').addEventListener('click', async function (e) {
                console.log("HERE IT IS IN THE CLICK")
                localStorage.removeItem('accessToken') 
                window.location.href = domainName;
            });
        }
    }, 1000)