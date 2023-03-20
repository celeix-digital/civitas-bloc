const domainName = "https://civitasbloc.webflow.io/"
const restrictedRoutes = [
    "/agency/dashboard", "/agency/grants/create-grant", "/organization/dashboard", "/organization/find-grants/grant-locator"
]
const unRestrictedRoutes = ["/organization/login", "/agency/login", "/organization/sign-up", "/agency/sign-up"]
function authCheck() {
    const token = localStorage.getItem("accessToken");
    const currentPath = window.location.pathname;
    console.log("token", token)
    if(token) {
        document.getElementById('loginLink').style.display = "none";
        document.getElementById('signUpLink').style.display = "none";
    }
    else {
        document.querySelector('[fs-modal-element="opne"]').style.display = "none";
        document.getElementById('logoutLink').style.display = "none";
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

window.onload = function() {
    setTimeout(()=>{
        authCheck();
        // document.getElementById('logoutLink').addEventListener("click", function(){
        //     // console.log("HERE IT IS IN THE CLICK")
        //     // localStorage.clear();
        //     // window.location.href = domainName;
        // })

        document.querySelector('#logoutLink').addEventListener('click', async function (e) {
            console.log("HERE IT IS IN THE CLICK")
            localStorage.clear();
            window.location.href = domainName;
        });
    }, 1000)
}