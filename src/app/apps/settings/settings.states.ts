import { State } from "../../sdk/state-navigation/state.interface";
import { HomeComponent } from "./views/home/home.component";
import { AboutComponent } from "./views/about/about.component";
import { CustomizationComponent } from "./views/customization/customization.component";
import { AccountComponent } from "./views/account/account.component";

export const settingsStates: Array<State> = [
    {
        name: 'home',
        component: HomeComponent,
        default: true
    },
    {
        name: 'customization',
        component: CustomizationComponent,
        extra: {
            label: 'Personnalisation',
            icon: 'tune',
        },
    },
    {
        name: 'account',
        component: AccountComponent,
        extra: {
            label: 'Compte',
            icon: 'person',
        },
    },
    {
        name: 'about',
        component: AboutComponent,
        extra: {
            label: 'À propos',
            icon: 'info',
        },
    },
];
