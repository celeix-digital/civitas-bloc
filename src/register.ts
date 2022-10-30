const url: string = "https://civitas-api.herokuapp.com/v1/front/users/register";
interface SignupResponse {
    status: boolean;
    data: object;
    message: string;
}
interface SignupData {
    name: string;
    wallet: string;
    email: string;
    password: string;
}
const fetchData = async (obj: Object): Promise<SignupResponse | null> => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const signup: SignupResponse = await response.json();
        return signup;
    } catch (error) {
        return null;
    }
};

const registerClickButton = document.getElementById('registerClickButton');
registerClickButton?.addEventListener('click', async function handleClick(event) {
    event.preventDefault(); //In order for page to prevent load when clicked the button
    const errorMessageContainer = document.getElementById('errorMessageContainer') as HTMLInputElement | null;
    const successMessageContainer = document.getElementById('successMessageContainer') as HTMLInputElement | null;
    if(errorMessageContainer) errorMessageContainer.innerHTML = ""
    if(successMessageContainer) successMessageContainer.innerHTML = ""
    
    const userNameInput = document.getElementById('userNameInput') as HTMLInputElement | null;
    const userEmailInput = document.getElementById('userEmailInput') as HTMLInputElement | null;
    const userWalletInput = document.getElementById('userWalletInput') as HTMLInputElement | null;
    const userPasswordInput = document.getElementById('userPasswordInput') as HTMLInputElement | null;
    
    const userNameValue = userNameInput?.value;
    const userEmailValue = userEmailInput?.value;
    const userWalletValue = userWalletInput?.value;
    const userPasswordValue = userPasswordInput?.value;
    console.log(userNameValue, userEmailValue, userWalletValue, userPasswordValue) // 👉️ "Initial value"
    if(!userNameValue || !userEmailValue || !userWalletValue || !userPasswordValue) {
        if(errorMessageContainer) errorMessageContainer.innerHTML = "Please provide all required values."
        return;
    }
    let data: SignupData = {
        name: userNameValue,
        wallet: userWalletValue,
        email: userEmailValue,
        password: userPasswordValue
    }
    let response = await fetchData(data);
    if(response && response?.status) {
        if(successMessageContainer) successMessageContainer.innerHTML = response.message;
        if(userNameInput?.value) userNameInput.value = ""
        if(userEmailInput?.value) userEmailInput.value = ""
        if(userWalletInput?.value) userWalletInput.value = ""
        if(userPasswordInput?.value) userPasswordInput.value = ""
    }
    else if(response && !response?.status) {
        if(errorMessageContainer) errorMessageContainer.innerHTML = response.message;
    }
});