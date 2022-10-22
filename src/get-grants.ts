// Type defenition for Grant. This will allow me to map these items later in the code
export interface Grant {
    id: number;
    grant_name: string;
    organization: string;
    funding_total: string;
    opportunity_number: string;
    summary: string;
  }
  
  // Pulling from the finsweet api to safely load their attribute for better loading of data. Do not remove
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsload',
    async (listInstances: CMSList[]) => {
      console.log('cmsload Successfully loaded!');
  
      // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
      // CMSList is a defined item from the 'CMScore' from Finsweet and does not have to be defined here
      const [listInstance] = listInstances;
  
      // Save a copy of the template element
      const [item] = listInstance.items;
      const itemTemplateElement = item.element;
  
      // Fetch the external data
      const grants = await fetchGrants();
  
      //Remove the placeholder data
      listInstance.clearItems();
  
      //Create the items from the external data
      const newItems = grants.map((grant) => newItem(grant, itemTemplateElement));
  
      // Feed the new items into the CMSList
      await listInstance.addItems(newItems);
    },
  ]);
  
  /**
   * Fetches the products from the api. Using Xano in this example
   */
  
  const fetchGrants = async (): Promise<Grant[]> => {
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:5nBnj5Ua/grant');
      const grants: Grant[] = await response.json();
  
      return grants;
    } catch (error) {
      return [];
    }
  };
  
  /**
   * Creates a new Collection Item from the template + external data
   * @param grant
   * @param templateElement
   */
  
  const newItem = (grant: Grant, templateElement: HTMLDivElement) => {
    // Clone the template element
    const newItem = templateElement.cloneNode(true) as HTMLDivElement;
  
    // query the internal elelments of the collection
    const title = newItem.querySelector<HTMLHeadingElement>('[data-element="grant-title"]');
    const rfaNumber = newItem.querySelector<HTMLDivElement>('[data-element="rfaNumber"]');
    // const grantSummary = newItem.querySelector<HTMLParagraphElement>('[data-element="grant-title"]');
    const grantSummary = newItem.querySelector<HTMLParagraphElement>('[data-element="grant-summary"]');
    const grantBudget = newItem.querySelector<HTMLDivElement>('[data-element="grant-budget"]');
  
    // populate the internal items
    if (title) title.textContent = grant.grant_name;
    if (rfaNumber) rfaNumber.textContent = grant.opportunity_number;
    if (grantSummary) grantSummary.textContent = grant.summary;
    if (grantBudget) grantBudget.textContent = grant.funding_total;
  
    return newItem;
  };
  