import "./styles/index.scss";
import "./styles/typography.scss";
import "./styles/colors.scss";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { DataContext } from "./apis/dataContext";
import { v4 as uuid } from "uuid";
import Content from "./components/Content";
import Overlay from "./components/Overlay";
function App() {
  const [data, setData] = useState([
    {
      id: uuid(),
      name: "Platform Launch",
      columns: [
        {
          id: uuid(),
          name: "Todo",
          tasks: [
            {
              id: uuid(),
              title: "Build UI for onboarding flow",
              description: "",
              status: "Todo",
              subtasks: [
                {
                  id: uuid(),
                  title: "Sign up page",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Sign in page",
                  isCompleted: false,
                },
                {
                  id: uuid(),
                  title: "Welcome page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: uuid(),
              title: "Build UI for search",
              description: "",
              status: "Todo",
              subtasks: [
                {
                  id: uuid(),
                  title: "Search page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: uuid(),
              title: "Build settings UI",
              description: "",
              status: "Todo",
              subtasks: [
                {
                  id: uuid(),
                  title: "Account page",
                  isCompleted: false,
                },
                {
                  id: uuid(),
                  title: "Billing page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: uuid(),
              title: "QA and test all major user journeys",
              description:
                "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
              status: "Todo",
              subtasks: [
                {
                  id: uuid(),
                  title: "Internal testing",
                  isCompleted: false,
                },
                {
                  id: uuid(),
                  title: "External testing",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: uuid(),
          name: "Doing",
          tasks: [
            {
              id: uuid(),
              title: "Design settings and search pages",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  id: uuid(),
                  title: "Settings - Account page",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Settings - Billing page",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Search page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: uuid(),
              title: "Add account management endpoints",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  id: uuid(),
                  title: "Upgrade plan",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Cancel plan",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Update payment method",
                  isCompleted: false,
                },
              ],
            },
            {
              id: uuid(),
              title: "Design onboarding flow",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  id: uuid(),
                  title: "Sign up page",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Sign in page",
                  isCompleted: false,
                },
                {
                  id: uuid(),
                  title: "Welcome page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: uuid(),
              title: "Add search endpoints",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  id: uuid(),
                  title: "Add search endpoint",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Define search filters",
                  isCompleted: false,
                },
              ],
            },
            {
              id: uuid(),
              title: "Add authentication endpoints",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  id: uuid(),
                  title: "Define user model",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Add auth endpoints",
                  isCompleted: false,
                },
              ],
            },
            {
              id: uuid(),
              title:
                "Research pricing points of various competitors and trial different business models",
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              status: "Doing",
              subtasks: [
                {
                  id: uuid(),
                  title: "Research competitor pricing and business models",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Outline a business model that works for our solution",
                  isCompleted: false,
                },
                {
                  id: uuid(),
                  title:
                    "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: uuid(),
          name: "Done",
          tasks: [
            {
              id: uuid(),
              title: "Conduct 5 wireframe tests",
              description:
                "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
              status: "Done",
              subtasks: [
                {
                  id: uuid(),
                  title: "Complete 5 wireframe prototype tests",
                  isCompleted: true,
                },
              ],
            },
            {
              id: uuid(),
              title: "Create wireframe prototype",
              description:
                "Create a greyscale clickable wireframe prototype to test our assumptions so far.",
              status: "Done",
              subtasks: [
                {
                  id: uuid(),
                  title: "Create clickable wireframe prototype in Balsamiq",
                  isCompleted: true,
                },
              ],
            },
            {
              id: uuid(),
              title: "Review results of usability tests and iterate",
              description:
                "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
              status: "Done",
              subtasks: [
                {
                  id: uuid(),
                  title:
                    "Meet to review notes from previous tests and plan changes",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Make changes to paper prototypes",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Conduct 5 usability tests",
                  isCompleted: true,
                },
              ],
            },
            {
              id: uuid(),
              title:
                "Create paper prototypes and conduct 10 usability tests with potential customers",
              description: "",
              status: "Done",
              subtasks: [
                {
                  id: uuid(),
                  title: "Create paper prototypes for version one",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Complete 10 usability tests",
                  isCompleted: true,
                },
              ],
            },
            {
              id: uuid(),
              title: "Market discovery",
              description:
                "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
              status: "Done",
              subtasks: [
                {
                  id: uuid(),
                  title: "Interview 10 prospective customers",
                  isCompleted: true,
                },
              ],
            },
            {
              id: uuid(),
              title: "Competitor analysis",
              description: "",
              status: "Done",
              subtasks: [
                {
                  id: uuid(),
                  title: "Find direct and indirect competitors",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "SWOT analysis for each competitor",
                  isCompleted: true,
                },
              ],
            },
            {
              id: uuid(),
              title: "Research the market",
              description:
                "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
              status: "Done",
              subtasks: [
                {
                  id: uuid(),
                  title: "Write up research analysis",
                  isCompleted: true,
                },
                {
                  id: uuid(),
                  title: "Calculate TAM",
                  isCompleted: true,
                },
              ],
            },
          ],
        },
      ],
    },
    { id: uuid(), name: "Marketing Plan", columns: [] },
  ]);
  const [board, setBoard] = useState(data[0].id);
  const [overlay, setOverlay] = useState(null);
  const getBoardData = (id) => {
    return data.find((board) => board.id === id);
  };
  const getColumns = (id) => {
    return getBoardData(id).columns.map(({ name }) => name);
  };
  const countCompleted = (subtasks) => {
    return subtasks.reduce(
      (total, curr) => total + (curr.isCompleted ? 1 : 0),
      0
    );
  };
  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        board,
        setBoard,
        overlay,
        setOverlay,
        getBoardData,
        getColumns,
        countCompleted,
      }}
    >
      {overlay ? <Overlay>{overlay}</Overlay> : null}
      <Sidebar />
      <Content />
    </DataContext.Provider>
  );
}

export default App;
