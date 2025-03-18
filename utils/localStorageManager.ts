export const loadData = <T>(key: string): T | null => {
	try {
		const stored = localStorage.getItem(key);
		return stored ? JSON.parse(stored) as T : null;
	} catch (error) {
		console.error("Error loading from localStorage", error);
		return null;
	}
};

export const saveData = <T>(key: string, data: T): void => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {
		console.error("Error saving to localStorage", error);
	}
};

export const clearData = (key: string): void => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error("Error removing from localStorage", error);
	}
};
