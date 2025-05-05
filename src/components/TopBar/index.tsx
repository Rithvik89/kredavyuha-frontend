import { useStores } from "../../logic/Providers/StoreProviders";
import TopBarDesktop from "./TopBarDesktop";
import {TopBarMobile} from "./TopBarMobile";


function TopBar() {
  const stores = useStores();
  if (stores.appStore.isPhone) {
    return (
      <TopBarMobile/>
    );
  }
  if (stores.appStore.isTablet){
    return (
     <></>
    )
  }
  return (
    <TopBarDesktop/>
  );
}

export default TopBar;