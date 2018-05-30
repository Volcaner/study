import Dictionary from "../public/dictionary_by_array.js";
import Public from "../public/public.js";

var pBook = new Dictionary();
function showAll() {
	var dataKeys = Public.toArray(Object.keys(this.dataStore));
	for(var key in dataKeys.sort()) {
		console.log(dataKeys[key] + " -> " + this.dataStore[dataKeys[key]]);
	}
};
pBook.showAll = showAll;

pBook.add("Mike", "123");
pBook.add("David", "345");
pBook.add("Cynthia", "456");
pBook.add("Jimy", "34567");
pBook.add("Tom", "289");
pBook.add("Aiby", "980");
pBook.add("Tim", "456");

console.log("David\'s extension: " + pBook.find("David"));
pBook.remove("David");
pBook.showAll();
console.log(pBook.count());
pBook.clear();
pBook.showAll();