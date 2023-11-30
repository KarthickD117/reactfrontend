import Dashboard from "../dashboard/dashboard";
import Report from "../dashboard/Reports";

class pageobject {
    DashBoard = Dashboard
    Reports = Report
}

export const {DashBoard} = new pageobject()
export const {Reports} = new pageobject()