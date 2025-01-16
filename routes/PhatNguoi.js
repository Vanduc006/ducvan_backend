import axios from "axios";

export default async function PhatNguoi(bienso, callback) {
    const url = "https://phatnguoi.com/action.php";
    const formData = new URLSearchParams({
        type: "1",
        retry: "1",
        loaixe: "1",
        bsx: bienso,
        bsxdangkiem: "",
        bien: "T",
        tem: ""
    });

    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Referer": "https://phatnguoi.com",
        "Content-Type": "application/x-www-form-urlencoded",
    };

    const cookies = {
        vehicle_data: JSON.stringify({
            license_plate: bienso,
            captcha_status: "valid",
        }),
    };

    try {
        const response = await axios.post(url, formData.toString(), {
            headers: {
                ...headers,
                Cookie: `vehicle_data=${encodeURIComponent(cookies.vehicle_data)}`,
            },
        });

        // const data = {
        //     // bienso,
        //     // status: response.status,
        //     data: response.data,
        // };

        callback(null, response.data); // First parameter for error is `null`
    } catch (error) {
        const errorData = {
            // bienso,
            error: "FALSE",
            details: error.message,
        };

        callback(errorData, null); // First parameter for error, second for result
    }
}

// Call the function with a callback
