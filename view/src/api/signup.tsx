export const createNewUser = async (name: string, lastName: string, email: string, password: string) => {
        // Make a POST request to your server's signup endpoint using fetch
        const response = await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: name,
                last_name: lastName,
                email: email.toLowerCase(),
                password,
            }),
        });
        return response;
}