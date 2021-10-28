import enLang from "./entries/en-US";
import viLang from "./entries/vi-VN";
import {addLocaleData} from "react-intl";

const AppLocale = {
  en: enLang,
  vi: viLang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.vi.data);

export default AppLocale;
