export const CREATE_USER = 'CREATE_USER';
export const UPDATE_GENDER = 'UPDATE_GENDER';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
import baseUrl from '../../constants/baseUrl';



export const createUser = (mobilenumber) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/appusers/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobile: mobilenumber,
                fullName: '',
                email: '',
                pincode: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                dateOfBirth: ''

            })
        });

        const resData = await response.json();
        //console.log(resData);

        dispatch({
            type: CREATE_USER, userdata: resData

        });
    };
};


export const updateUserGender = (id, gendervalue, mobile) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/appusers/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: id,
                gender: gendervalue,
                username: 'VooZoo' + mobile


            })
        });

        const resData = await response.json();
        // console.log(resData);

        dispatch({
            type: UPDATE_GENDER, userdata: resData

        });
    };
};



export const updateUserContact = (userID, fullName, mobile, email, pincode, address1, address2, city, state) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/appusers/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID,
                fullName,
                mobile,
                email,
                pincode,
                address1,
                address2,
                city,
                state,


            })
        });

        const resData = await response.json();
        // console.log(resData);

        dispatch({
            type: UPDATE_CONTACT, userdata: resData

        });
    };
};

export const updateUserPersonal = (userID, dateOfBirth, gender) => {
    return async dispatch => {

        const response = await fetch(baseUrl.url + 'api/v1/appusers/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID,
                dateOfBirth,
                gender



            })
        });

        const resData = await response.json();

        dispatch({
            type: UPDATE_GENDER, userdata: resData

        });
    };
};