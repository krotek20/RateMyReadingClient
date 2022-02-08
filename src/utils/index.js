import BooksImport from "../modules/Book/Books.screen";
import BookIcon from "@mui/icons-material/Book";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DashBoard from "../modules/DashBoard/DashBoard.screen";
import AddQuestions from "../modules/Question/Question.screen";
import QuizScreen from "../modules/Quiz/QuizScreen";
import QuestionApprovalScreen from "../modules/Question/QuestionApprovalScreen";

const dashBoardScreen = {
  name: "Prima pagină",
  href: "/",
  icon: <HomeIcon />,
  screen: <DashBoard />,
};

const booksScreen = {
  name: "Listă cărți",
  href: "carti",
  icon: <BookIcon />,
  screen: <BooksImport />,
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

const approveQuestionsScreen = {
  name: "Verifică întrebări",
  href: "verifica_intrebare",
  icon: <AddTaskIcon />,
  screen: <QuestionApprovalScreen />,
};

export const childSections = [dashBoardScreen];

export const contributorSections = [dashBoardScreen, addQuestionsScreen];

export const superAdminSections = [
  dashBoardScreen,
  booksScreen,
  addQuestionsScreen,
  approveQuestionsScreen,
];

export const unIndexedSections = [quizScreen];

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

export const colorByDifficulty = (book) => {
  if (book.difficulty === "incepator") return "#f4a261";
  if (book.difficulty === "intermediar") return "#ffd166";
  if (book.difficulty === "avansat") return "#99d98c";
  if (book.difficulty === "expert") return "#06d6a0";
};
