import { AbstractWidgetConfig } from "@hatTypes/types";

export interface SearchBoxWidgetConfig extends AbstractWidgetConfig {
  placeholder: string;
  searchURLPhrase: string;
  buttonText: string;
}
