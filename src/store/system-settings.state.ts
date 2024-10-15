import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, } from "@ngxs/store";
import { CurrencySeparator, CurrencySymbolPosition } from "../open-api/index";
import { SetCurrencyData, SetCurrencyDisplay } from "./system-settings.state.actions";

export interface SystemSettingsStateInterface {
  currencyDisplay: string;
  currencySymbolPosition: CurrencySymbolPosition;
  currencyDecimalSeparator: CurrencySeparator;
  currencyThousandthsSeparator: CurrencySeparator;
}

@State<SystemSettingsStateInterface>({
  name: "systemSettings",
  defaults: {
    currencyDisplay: "$",
    currencyDecimalSeparator: CurrencySeparator.Period,
    currencyThousandthsSeparator: CurrencySeparator.Comma,
    currencySymbolPosition: CurrencySymbolPosition.Start,
  },
})
@Injectable()
export class SystemSettingsState {
  @Selector()
  static currencyDisplay(state: SystemSettingsStateInterface): string {
    return state.currencyDisplay;
  }

  @Selector()
  static currencyDecimalSeparator(state: SystemSettingsStateInterface): CurrencySeparator {
    return state.currencyDecimalSeparator;
  }

  @Selector()
  static currencyThousandthsSeparator(state: SystemSettingsStateInterface): CurrencySeparator {
    return state.currencyThousandthsSeparator;
  }

  @Selector()
  static currencySymbolPosition(state: SystemSettingsStateInterface): CurrencySymbolPosition {
    return state.currencySymbolPosition;
  }

  @Selector()
  static state(state: SystemSettingsStateInterface): SystemSettingsStateInterface {
    return state;
  }

  @Action(SetCurrencyDisplay)
  setCurrencyDisplay(
    { patchState }: StateContext<SystemSettingsStateInterface>,
    payload: SetCurrencyDisplay
  ) {
    patchState({
      currencyDisplay: payload.currencyDisplay,
    });
  }

  @Action(SetCurrencyData)
  setCurrencyData(
    { patchState }: StateContext<SystemSettingsStateInterface>,
    payload: SetCurrencyData
  ) {
    patchState({
      currencySymbolPosition: payload.currencySymbolPosition,
      currencyThousandthsSeparator: payload.currencyThousandthsSeparator,
      currencyDecimalSeparator: payload.currencyDecimalSeparator
    });
  }
}
