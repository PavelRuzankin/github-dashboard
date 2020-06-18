import '@/styles/index.scss';
import { Router } from "@core/Router";
import { CardPage } from '@/pages/card/CardPage';
import { SearchPage } from '@/pages/search/SaerchPage';

new Router("#app", {card: CardPage, search: SearchPage})

