import { API_BASE_URL } from "../constants";

export const fetchBudget = async (): Promise<number> => {
	const response = await fetch(`${API_BASE_URL}/budget`);
	if (!response.ok) {
    	throw new Error('Failed to fetch budget');
	}

    const json = await response.json();
    console.log("data in fetchBudget", json);
    const budget = json.data;

    console.log("response in fetchBudget", budget);
    return budget;
};
