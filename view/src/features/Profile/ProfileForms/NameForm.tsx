import { useDispatch } from "react-redux";
import { updateUserName } from "../../../api/profile";
import { TextField } from "@mui/material";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { setFirstName, setLastName } from "../../../store/UserSlice";

interface NameFormProps {
    firstNameLocal: string,
    lastNameLocal: string,
    setEditName: (arg0: boolean) => void;
    setFirstNameLocal: (arg0: string) => void;
    setLastNameLocal: (arg0: string) => void;
}


export const NameForm: React.FC<NameFormProps> = ({ firstNameLocal, lastNameLocal, setFirstNameLocal, setLastNameLocal, setEditName }) => {
    const dispatch = useDispatch();

    const handleUpdateName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updateName = await updateUserName(firstNameLocal, lastNameLocal);
        if (updateName) {
            dispatch(setFirstName(firstNameLocal));
            dispatch(setLastName(lastNameLocal))
        }
        setEditName(false);
    }


    return (
        <>
            <form onSubmit={handleUpdateName} className='account-form-1'>
                <div className="account-text-field-container">
                    <div>
                        <TextField
                            label="First name"
                            variant="outlined"
                            value={`${firstNameLocal}`}
                            onChange={(e) => setFirstNameLocal(e.target.value)}
                            sx={{
                                width: '150px', marginRight: '10px',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'aliceblue', // Outline color
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'aliceblue', // Outline color on hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'aliceblue', // Outline color on focus
                                    },

                                },
                                '& .MuiInputLabel-root': {
                                    color: 'aliceblue', // Label color
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'aliceblue', // Label color on focus
                                },
                                '& .MuiInputBase-input': {
                                    color: 'aliceblue', // Text color
                                },
                                '& .MuiInputBase-input:focus': {
                                    color: 'aliceblue', // Text color on focus
                                },
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            value={`${lastNameLocal}`}
                            onChange={(e) => setLastNameLocal(e.target.value)}
                            sx={{
                                width: '150px', marginRight: '10px',

                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'aliceblue', // Outline color
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'aliceblue', // Outline color on hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'aliceblue', // Outline color on focus
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'aliceblue', // Label color
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'aliceblue', // Label color on focus
                                },
                                '& .MuiInputBase-input': {
                                    color: 'aliceblue', // Text color
                                },
                                '& .MuiInputBase-input:focus': {
                                    color: 'aliceblue', // Text color on focus
                                },
                            }}
                        />
                    </div>
                </div>


                <div className="account-form-buttons">
                    <button type="submit"><FaCheck /></button>
                    <button type="button" onClick={() => { setEditName(false) }}><FaXmark /></button>
                </div>

            </form>
        </>
    )
}