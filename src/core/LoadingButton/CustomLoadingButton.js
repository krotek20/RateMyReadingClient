import { LoadingButton } from "@mui/lab";

const CustomLoadingButton = (props) => {
  return (
    <LoadingButton
      sx={{ mt: 1.5 }}
      fullWidth
      loading
      loadingPosition="start"
      variant="contained"
      {...props}
    >
      {props.children}
    </LoadingButton>
  );
};

export default CustomLoadingButton;
