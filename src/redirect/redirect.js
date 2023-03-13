const domainName = "https://civitasbloc.webflow.io/"
const restrictedRoutes = [
    "/agency/dashboard", "/agency/grants/create-grant", "/organization/dashboard", "/organization/find-grants/grant-locator"
]
const unRestrictedRoutes = ["/organization/login", "/agency/login", "/organization/sign-up", "/agency/sign-up"]
function authCheck() {
    const token = localStorage.getItem("accessToken");
    const currentPath = window.location.pathname;
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
authCheck();