import { AbstractWidgetConfig } from "../../../../types/types";

export interface SearchBoxWidgetConfig extends AbstractWidgetConfig {
  placeholder: string;
  searchURLPhrase: string;
  searchParamPhrase: string;
  buttonText: string;
}
