
import { TextField } from '@mui/material';

//This is customized textfield for LoginForm 

type Props = {
    name: string
    type: string
    label: string
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
        margin="normal" 
        variant="outlined"
        fullWidth
        InputLabelProps={{
            style: { 
                color: "#cbd5e1",
                fontSize: "16px",
            }
        }}
        name={props.name}
        label={props.label} 
        type={props.type} 
        InputProps={{ 
            style: { 
                maxWidth: "400px", 
                borderRadius: 8, 
                fontSize: 16, 
                color: "#f8fafc",
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
            }
        }}
        sx={{
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'rgba(99, 102, 241, 0.2)',
                },
                '&:hover fieldset': {
                    borderColor: 'rgba(99, 102, 241, 0.4)',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#6366f1',
                },
            },
        }}
    />
  );
};

export default CustomizedInput;
