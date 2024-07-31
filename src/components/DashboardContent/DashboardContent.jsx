import "./DashboardContent.css";
import ProductsFilters from "../ProductsFilters/ProductsFilters";
import ProductsList from "../ProductsList/ProductsList";
import ShopingList from "../ShopingList/ShopingList";
function DashboardContent() {
	
  return (
    <>
      <div className="appWrapper">
			<div className="filters">
        <ProductsFilters />
			</div>
        <div className="columnsWrapper">
          <ProductsList />
          <ShopingList />
        </div>
      </div>
    </>
  );
}

export default DashboardContent;
