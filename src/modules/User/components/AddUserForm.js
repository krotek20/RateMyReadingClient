import React, { useEffect, useState } from "react";
import { Box, Tooltip, Button, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { register, studentBatchRegister } from "../User.api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import XLSX from "xlsx";
import { getExtension } from "../../../utils";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import PublishIcon from "@mui/icons-material/Publish";
import Schools from "../../../core/AutoComplete/Schools.component";
import { getSchools } from "../../School/School.api";
import { logout } from "../../../core/NavigationMenu/Logout.api";

const mailFormat = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
export default function AddUserForm({ role, currentUserRole }) {
  const [schools, setSchools] = useState([]);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    schoolId: 0,
    birthYear: new Date("01.01.2000"),
    firstGradeRegistrationYear: new Date("01.01.2000"),
    city: "",
    email: "",
  });
  const [school, setSchool] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserRole === 1) {
      getSchools()
        .payload.then((response) => {
          if (response.status === 200) {
            setSchools(response.data);
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            logout();
            navigate("/login", { replace: true });
          }
        });
    }
  }, [navigate, currentUserRole]);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const getSchoolId = (schoolName) => {
    for (const index in schools) {
      if (schools[index].name === schoolName) {
        return schools[index].id;
      }
    }
    return -1;
  };

  const checkUserFields = () => {
    switch (role) {
      case "ROLE_STUDENT":
        return (
          !user.firstname ||
          !user.lastname ||
          !user.birthYear ||
          !user.firstGradeRegistrationYear
        );
      case ("ROLE_CONTRIBUTOR", "ROLE_SUPERADMIN"):
        return (
          !user.firstname ||
          !user.lastname ||
          !user.email ||
          !user.email.match(mailFormat)
        );
      case "ROLE_LOCALADMIN":
        return (
          !user.firstname ||
          !user.lastname ||
          !school.name ||
          !user.city ||
          !user.email ||
          !user.email.match(mailFormat)
        );
      case "ROLE_PROFESSOR":
        return (
          !user.firstname ||
          !user.lastname ||
          !user.city ||
          !user.email ||
          !user.email.match(mailFormat)
        );
      default:
        return null;
    }
  };

  const handleAddUser = () => {
    setLoading(true);
    if (!checkUserFields()) {
      const yearUser = {
        ...user,
        firstname: user.firstname.trim(),
        lastname: user.lastname.trim(),
        city: user.city.trim(),
        email: user.email.trim(),
        birthYear: user.birthYear.getFullYear(),
        firstGradeRegistrationYear:
          user.firstGradeRegistrationYear.getFullYear(),
      };
      register(yearUser, role, { ...school, name: school.name.trim() })
        .payload.then((res) => {
          if (res.status === 200) {
            setUser({
              firstname: "",
              lastname: "",
              schoolId: 0,
              birthYear: new Date("01.01.2000"),
              firstGradeRegistrationYear: new Date("01.01.2000"),
              city: "",
              email: "",
            });
            setSchool({ name: "" });
            handleAlert("success", "Utilizatorul a fost adăugat cu succes!");
          }
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            logout();
            navigate("/login", { replace: true });
          } else {
            handleAlert(
              "error",
              "A apărut o eroare, vă rugăm să încercați din nou"
            );
          }
          setLoading(false);
        });
    } else {
      handleAlert(
        "error",
        "Asigurați-vă că ați completat toate câmpurile obligatorii cu valori valide"
      );
      setLoading(false);
    }
  };

  const handleImportExcel = (e) => {
    const file = e.target.files[0];

    if (role) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLoading(true);

        const binaryString = event.target.result;
        const workBook = XLSX.read(binaryString, { type: "binary" });

        const workSheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[workSheetName];

        const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
        if (fileData[0][0].trim().toLowerCase() === "nume") {
          fileData.shift();
        }

        const newUsers = [];
        let userError = false;
        fileData.forEach((user) => {
          let newUser = null;
          let newSchool = null;
          if (role === "ROLE_STUDENT") {
            newUser = {
              firstname: user[0].trim(),
              lastname: user[1].trim(),
              birthYear: parseInt(user[2]),
              firstGradeRegistrationYear: parseInt(user[3]),
            };

            if (user[4] && currentUserRole === 1) {
              // school
              const id = getSchoolId(user[4].trim());
              if (id === -1) {
                userError = true;
                handleAlert(
                  "error",
                  `Școală introdusă incorect (${user[0].trim()} ${user[1].trim()})`
                );
              } else {
                newUser.schoolId = id;
              }
            }

            newUsers.push(newUser);
          } else if (role === "ROLE_LOCALADMIN") {
            newUser = {
              firstname: user[0].trim(),
              lastname: user[1].trim(),
              city: user[2].trim(),
              email: user[3].trim(),
            };
            newSchool = {
              name: user[4].trim(),
            };
          } else if (role === "ROLE_PROFESSOR") {
            newUser = {
              firstname: user[0].trim(),
              lastname: user[1].trim(),
              city: user[2].trim(),
              email: user[3].trim(),
            };
            if (user[4] && currentUserRole === 1) {
              // school
              const id = getSchoolId(user[4].trim());
              if (id === -1) {
                userError = true;
                handleAlert(
                  "error",
                  `Școală introdusă incorect (${user[0].trim()} ${user[1].trim()})`
                );
              } else {
                newUser.schoolId = id;
              }
            }
          } else if (
            role === "ROLE_CONTRIBUTOR" ||
            role === "ROLE_SUPERADMIN"
          ) {
            newUser = {
              firstname: user[0].trim(),
              lastname: user[1].trim(),
              email: user[2].trim(),
            };
          }

          if (role !== "ROLE_STUDENT" && !userError) {
            if (!newUser || !checkUserFields(newUser)) {
              handleAlert(
                "error",
                "A apărut o eroare, vă rugăm să vă asigurați că ați completat corect utilizatorii introduși"
              );
            } else {
              register(newUser, role, newSchool)
                .payload.then((response) => {
                  if (response.status === 200) {
                    handleAlert("success", "Utilizatori adăugați cu success!");
                  }
                })
                .catch((error) => {
                  if (error.response.status === 403) {
                    logout();
                    navigate("/login", { replace: true });
                  } else {
                    handleAlert(
                      "error",
                      "A apărut o eroare, vă rugăm să încercați din nou"
                    );
                  }
                });
            }
          }
        });

        if (role === "ROLE_STUDENT" && !userError) {
          studentBatchRegister(newUsers)
            .payload.then((response) => {
              if (response.status === 200) {
                if (response.data.error) {
                  handleAlert("error", response.data.errorMessage);
                } else {
                  handleAlert("success", "Utilizatori adăugați cu succes!");
                }
                setLoading(false);
              }
            })
            .catch((error) => {
              if (error.response.status === 403) {
                logout();
                navigate("/login", { replace: true });
              } else {
                handleAlert(
                  "error",
                  "A apărut o eroare, vă rugăm să încercați din nou"
                );
              }
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      };

      if (file !== undefined && getExtension(file)) {
        reader.readAsBinaryString(file);
      } else {
        handleAlert(
          "error",
          "Nu puteți incărca un fișier cu acest format! Puteți adăuga doar fișiere EXCEL sau CSV!"
        );
      }
    }

    const input = document.getElementById("excelInputUser");
    input.value = "";
  };

  const textFieldProps = (item, label) => ({
    sx: { mx: 1.2 },
    inputProps: { "max-length": 250, style: { fontSize: 14 } },
    InputLabelProps: { shrink: true, style: { fontSize: 14 } },
    required: true,
    id: `${item}-field`,
    label: label,
    variant: "standard",
    value: user[item],
    onChange: (e) => setUser({ ...user, [`${item}`]: e.target.value }),
  });

  const datePickerProps = (item, label) => ({
    views: ["year"],
    InputLabelProps: { shrink: true },
    id: `${item}-field`,
    label: label,
    maxDate: new Date(),
    value: user[item],
    onChange: (e) => setUser({ ...user, [`${item}`]: e }),
  });

  const boxProps = () => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    my: 1.5,
  });

  const studentForm = () => (
    <Box display="flex" flexDirection="column" my={2}>
      <Box {...boxProps()}>
        <TextField {...textFieldProps("lastname", "Nume")} />
        <TextField {...textFieldProps("firstname", "Prenume")} />
      </Box>
      {currentUserRole === 1 && (
        <Schools
          variant="standard"
          fullWidth={false}
          onInputChange={(e, val) => setUser({ ...user, schoolId: val.id })}
        />
      )}
      <Box {...boxProps()}>
        <DatePicker
          {...datePickerProps("birthYear", "Anul nașterii")}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ mx: 1.2 }}
              variant="standard"
              required
              helperText={null}
            />
          )}
        />
        <DatePicker
          {...datePickerProps(
            "firstGradeRegistrationYear",
            "Anul înmatriculării în clasa I"
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ mx: 1.2 }}
              variant="standard"
              required
              helperText={null}
            />
          )}
        />
      </Box>
    </Box>
  );

  const professorForm = () => (
    <Box display="flex" flexDirection="column">
      <Typography color="secondary.main" fontSize={13} fontWeight="bold" mb={2}>
        Asigurați-vă că ați introdus un email valid: example@yahoo.com
      </Typography>
      <Box {...boxProps()}>
        <TextField {...textFieldProps("lastname", "Nume")} />
        <TextField {...textFieldProps("firstname", "Prenume")} />
      </Box>
      {currentUserRole === 1 && (
        <Schools
          variant="standard"
          fullWidth={false}
          onInputChange={(e, val) => setUser({ ...user, schoolId: val.id })}
        />
      )}
      <Box {...boxProps()}>
        <TextField {...textFieldProps("city", "Localitate")} />
        <TextField {...textFieldProps("email", "Email")} />
      </Box>
    </Box>
  );

  const LocalAdminForm = () => (
    <Box display="flex" flexDirection="column">
      <Typography color="secondary.main" fontSize={13} fontWeight="bold" mb={2}>
        Asigurați-vă că ați introdus un email valid: example@yahoo.com
      </Typography>
      <Box {...boxProps()}>
        <TextField {...textFieldProps("lastname", "Nume")} />
        <TextField {...textFieldProps("firstname", "Prenume")} />
      </Box>
      <TextField
        {...textFieldProps("school", "Școală")}
        value={school.name}
        onChange={(e) => setSchool({ ...school, name: e.target.value })}
      />
      <Box {...boxProps()}>
        <TextField {...textFieldProps("city", "Localitate")} />
        <TextField {...textFieldProps("email", "Email")} />
      </Box>
    </Box>
  );

  const contributorAndSuperAdminForm = () => (
    <Box display="flex" flexDirection="column" mb={2}>
      <Typography color="secondary.main" fontSize={13} fontWeight="bold" mb={2}>
        Asigurați-vă că ați introdus un email valid: example@yahoo.com
      </Typography>
      <Box {...boxProps()}>
        <TextField {...textFieldProps("lastname", "Nume")} />
        <TextField {...textFieldProps("firstname", "Prenume")} />
      </Box>
      <TextField {...textFieldProps("email", "Email")} my={1.5} />
    </Box>
  );

  const formByUserRole = () => {
    if (role === "ROLE_STUDENT") return studentForm();
    if (role === "ROLE_PROFESSOR") return professorForm();
    if (role === "ROLE_LOCALADMIN") return LocalAdminForm();
    if (role === "ROLE_CONTRIBUTOR") return contributorAndSuperAdminForm();
    if (role === "ROLE_SUPERADMIN") return contributorAndSuperAdminForm();
  };

  return role ? (
    <Box>
      <Typography color="secondary.main" fontSize={13} fontWeight="bold">
        Toate câmpurile notate cu (*) sunt obligatorii!
      </Typography>
      {formByUserRole()}
      <Box display="flex" justifyContent="space-around">
        {loading ? (
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Salvează
          </LoadingButton>
        ) : (
          <Tooltip title="Înregistrează utilizator" arrow placement="bottom">
            <Button
              id="button-save"
              variant="contained"
              size="medium"
              onClick={handleAddUser}
              startIcon={<SaveIcon />}
            >
              Salvează
            </Button>
          </Tooltip>
        )}
        {loading ? (
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Excel
          </LoadingButton>
        ) : (
          <Tooltip
            title="Adaugă utilizatori noi direct din excel"
            arrow
            placement="bottom"
          >
            <Button
              variant="contained"
              component="label"
              startIcon={<PublishIcon />}
            >
              <input
                id="excelInputUser"
                className="input"
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain"
                onChange={handleImportExcel}
                hidden
              />
              Excel
            </Button>
          </Tooltip>
        )}
      </Box>
    </Box>
  ) : (
    <Typography fontSize={14}>
      Selectează un rol pentru a genera formularul de adăugare
    </Typography>
  );
}
