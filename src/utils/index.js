import BooksImport from "../modules/Book/Books.screen";
import BookIcon from "@mui/icons-material/Book";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DashBoard from "../modules/DashBoard/DashBoard.screen";
import StartQuiz from "../modules/Start/StartQuiz.screen";
import AddQuestions from "../modules/Question/Question.screen";
import QuizScreen from "../modules/Quiz/QuizScreen";
import ApprovedQuestions from "../modules/Question/ApprovedQuestions.screen";
import FinishScreen from "../modules/Finish/Finish.screen";
import DeniedQuestions from "../modules/Question/DeniedQuestions.screen";
import AddUser from "../modules/User/AddUser.screen";
import {
  getDeniedQuestions,
  getUnapprovedQuestions,
} from "../modules/Question/Question.api";
import ModifyUser from "../modules/User/ModifyUser.screen";
import UsersList from "../modules/User/UsersList.screen";
import SchoolsList from "../modules/School/SchoolsList.screen";

const dashBoardScreen = {
  name: "Prima pagină",
  href: "/",
  icon: <HomeIcon />,
  screen: <DashBoard />,
};

const studentReportScreen = {
  name: "Statistici",
  href: "statistici",
  icon: <EqualizerIcon />,
  screen: <DashBoard />,
};

const startQuiz = {
  name: "Începe chestionar",
  href: "start",
  icon: <PlayCircleOutlineIcon />,
  screen: <StartQuiz />,
};

const startQuizStudent = {
  name: "Chestionare",
  href: "/",
  icon: <PlayCircleOutlineIcon />,
  screen: <StartQuiz />,
};

const booksScreen = {
  name: "Listă cărți",
  href: "carti",
  icon: <BookIcon />,
  screen: <BooksImport />,
};

const usersScreen = {
  name: "Listă utilizatori",
  href: "user",
  icon: <GroupIcon />,
  screen: <UsersList />,
};

const schoolsScreen = {
  name: "Listă școli",
  href: "school",
  icon: <SchoolIcon />,
  screen: <SchoolsList />,
};

const addQuestionsScreen = {
  name: "Adaugă întrebări",
  href: "intrebari",
  icon: <QuizIcon />,
  screen: <AddQuestions />,
};

const quizScreen = {
  href: "quiz/:quizId",
  screen: <QuizScreen />,
};

const approvedQuestionsScreen = {
  name: "Verifică întrebări",
  href: "intrebari/verifica",
  icon: <AddTaskIcon />,
  screen: <ApprovedQuestions />,
};

const deniedQuestionsScreen = {
  name: "Editează întrebări",
  href: "intrebari/editeaza",
  icon: <EditIcon />,
  screen: <DeniedQuestions />,
};

const finishScreen = {
  href: "quiz/:quizId/finish",
  screen: <FinishScreen />,
};

const addUserScreen = {
  name: "Adaugă utilizatori",
  href: "user/add",
  icon: <PersonAddIcon />,
  screen: <AddUser />,
};

const modifyUserScreen = {
  name: "Modifică utilizatori",
  href: "user/modify",
  icon: <AccessibilityIcon />,
  screen: <ModifyUser />,
};

const divider = {
  href: "divider",
  screen: "divider",
};

export const childSections = [startQuizStudent, studentReportScreen];

export const teacherSections = [
  dashBoardScreen,
  startQuiz,
  divider,
  addUserScreen,
  modifyUserScreen,
];

export const contributorSections = [addQuestionsScreen];

export const localAdminSections = [
  dashBoardScreen,
  startQuiz,
  divider,
  usersScreen,
  addUserScreen,
  modifyUserScreen,
];

export const superAdminSections = [
  dashBoardScreen,
  startQuiz,
  divider,
  booksScreen,
  usersScreen,
  schoolsScreen,
  divider,
  addQuestionsScreen,
  approvedQuestionsScreen,
  deniedQuestionsScreen,
  divider,
  addUserScreen,
  modifyUserScreen,
];

export const unIndexedSections = [quizScreen, finishScreen];

export const avatarNames = [
  "Mary Baker",
  "Amelia Earhart",
  "Mary Roebling",
  "Sarah Winnemucca",
  "Margaret Brent",
  "Lucy Stone",
  "Mary Edwards",
  "Margaret Chase",
  "Mahalia Jackson",
  "Maya Angelou",
  "Margaret Bourke",
  "Eunice Kennedy",
  "Carrie Chapman",
  "Elizabeth Peratrovich",
  "Alicia Dickerson",
  "Daisy Gatson",
  "Emma Willard",
  "Amelia Boynton",
  "Maria Mitchell",
  "Sojourner Truth",
  "Willa Cather",
  "Coretta Scott",
  "Harriet Tubman",
  "Fabiola Cabeza",
  "Sacagawea",
  "Esther Martinez",
  "Elizabeth Cady",
  "Bessie Coleman",
  "Ma Rainey",
  "Julia Ward",
  "Irene Morgan",
  "Babe Didrikson",
  "Lyda Conley",
  "Annie Dodge",
  "Maud Nathan",
  "Betty Ford",
  "Rosa Parks",
  "Susan La",
  "Gertrude Stein",
  "Wilma Mankiller",
  "Grace Hopper",
  "Jane Addams",
  "Katharine Graham",
  "Florence Chadwick",
  "Zora Neale",
  "Wilma Rudolph",
  "Annie Jump",
  "Mother Frances",
  "Jovita Idár",
  "Maggie L",
  "Henrietta Swan",
  "Jane Cunningham",
  "Victoria Woodhull",
  "Helen Keller",
  "Patsy Takemoto",
  "Chien-Shiung",
  "Dorothea Dix",
  "Margaret Sanger",
  "Alice Paul",
  "Frances Willard",
  "Sally Ride",
  "Juliette Gordon",
  "Queen Lili",
  "Katharine Lee",
  "Harriet Beecher",
  "Felisa Rincon",
  "Hetty Green",
  "Belva Lockwood",
  "Biddy Mason",
  "Ida B",
  "Eleanor Roosevelt",
  "Maria Goeppert",
  "Phillis Wheatley",
  "Mary Harris",
  "Fannie Lou",
  "Rosalyn Yalow",
  "Susan B",
  "Clara Barton",
  "Lady Deborah",
  "Jane Johnston",
  "Alice Childress",
  "Georgia O",
  "Rebecca Crumpler",
  "Anne Bradstreet",
  "Elizabeth Blackwell",
  "Christa McAuliffe",
  "Edmonia Lewis",
  "Nellie Bly",
  "Mary Cassatt",
  "Pauli Murray",
  "Ellen Swallow",
  "Hedy Lamarr",
  "Pearl Kendrick",
  "Abigail Adams",
  "Margaret Fuller",
  "Emma Lazarus",
  "Marian Anderson",
  "Virginia Apgar",
  "Mary Walton",
];

export const colorByDifficulty = (difficulty) => {
  if (!difficulty) {
    return "";
  }
  if (
    difficulty.toLowerCase().trim() === "incepator" ||
    difficulty.toLowerCase().trim() === "începător"
  )
    return "#3FA796";
  if (difficulty.toLowerCase().trim() === "mediu") return "#502064";
  if (difficulty.toLowerCase().trim() === "avansat") return "#FFBD35";
  if (difficulty.toLowerCase().trim() === "expert") return "#1572A1";
};

export const minTwoDigits = (n) => {
  return (n < 10 ? "0" : "") + n;
};

// export const getTextColor = (bgColor) => {
//   const lightness = bgColor.replace("%)", "").split(",")[2] - 50;
//   return `hsl(0, 0%, ${
//     (lightness < 0 ? Math.min(lightness, -1) : Math.max(lightness, 1)) * -100
//   }%)`;
// };

export const localeIncludes = (
  string,
  searchString,
  { position = 0, locales, ...options } = {}
) => {
  if (
    string === undefined ||
    string === null ||
    searchString === undefined ||
    searchString === null
  ) {
    throw new Error("localeIncludes requires at least 2 parameters");
  }

  const stringLength = string.length;
  const searchStringLength = searchString.length;
  const lengthDiff = stringLength - searchStringLength;

  for (let i = position; i <= lengthDiff; i++) {
    if (
      string
        .substring(i, i + searchStringLength)
        .localeCompare(searchString, locales, options) === 0
    ) {
      return true;
    }
  }

  return false;
};

export const getNoOfUnapprovedQuestions = () => {
  return getUnapprovedQuestions().payload.then((res) => {
    if (res.status === 200) {
      return res.data.length;
    }
  });
};

export const getNoOfDeniedQuestions = () => {
  return getDeniedQuestions().payload.then((res) => {
    if (res.status === 200) {
      return res.data.length;
    }
  });
};

export const getExtension = (file) => {
  const splittedFile = file.name.split(".");
  const extension = splittedFile[splittedFile.length - 1];
  return (
    extension === "xlsx" ||
    extension === "xls" ||
    extension === "txt" ||
    extension === "csv"
  );
};

export const feedbackQuiz = {
  0: ["Ar fi bine să mai citești o dată cartea"],
  1: ["Ar fi bine să mai citești o dată cartea"],
  2: ["Ar fi bine să mai citești o dată cartea"],
  3: ["Citește cu mai multă atenție"],
  4: ["Citește cu mai multă atenție"],
  5: ["Nu renunța, poți mai bine!", "Am încredere că poți mai bine!"],
  6: ["Ține-o tot așa!", "Tot înainte! continuă!"],
  7: ["Bravo!", "Ești grozav!"],
  8: ["Foarte bine!", "Sunt mândru de tine!", "Gândești foarte bine!"],
  9: [
    "Super!",
    "Excelent",
    "Te-ai descurcat de minune!",
    "Ai făcut o treabă foarte bună!",
  ],
  10: [
    "Esti cel mai tare!",
    "Extraordinar",
    "Cool! Ai luat punctaj maxim!",
    "Ești foarte bun la asta!",
  ],
};

export const convertToHoursAndMinutes = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  if (minutes === 0) {
    if (hours <= 0) {
      return "câteva secunde...";
    }
    if (hours === 1) {
      return "1 oră";
    }
    return `${hours} ore`;
  } else if (minutes === 1) {
    if (hours <= 0) {
      return "1 minut";
    }
    if (hours === 1) {
      return "1 oră și 1 minut";
    }
    return `${hours} ore și 1 minut`;
  } else if (minutes < 20) {
    if (hours <= 0) {
      return `${minutes} minute`;
    }
    if (hours === 1) {
      return `1 oră și ${minutes} minute`;
    }
    return `${hours} ore și ${minutes} minute`;
  } else {
    if (hours <= 0) {
      return `${minutes} de minute`;
    }
    if (hours === 1) {
      return `1 oră și ${minutes} de minute`;
    }
    return `${hours} ore și ${minutes} de minute`;
  }
};
