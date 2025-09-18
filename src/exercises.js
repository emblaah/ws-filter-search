// ====== Higher-order functions ======
export function hasOutOfStock(items) {
  return items.some((p) => !p.inStock);
}

export function allAffordable(items, max) {
  return items.every((pris) => pris.price <= max);
}

export function findByTag(items, tag) {
  return items.find((item) => item.tags && item.tags.includes(tag));
}

export function totalPrice(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
  // return Number – summan av alla product.price
  // använd reduce()
}

export function sortByName(items, direction = "asc") {
  const copyArr = [...items];

  return copyArr.sort((a, b) => {
    const first = a.name.toLowerCase();
    const second = b.name.toLowerCase();
    if (first < second) return direction === "asc" ? -1 : 1;
    if (first > second) return direction === "asc" ? 1 : -1;
    return 0;
  });
  // return Array – NY array av produkter sorterad på name (asc/desc)
  // använd sort() på en kopia
}

export function sortByPrice(items, direction = "ascending") {
  const copyArr = [...items];

  return copyArr.sort((a, b) => {
    if (a.price < b.price) return direction === "ascending" ? -1 : 1;
    if (a.price > b.price) return direction === "ascending" ? 1 : -1;
    return 0;
  });
}

// ====== Regex ======
export function extractHashtags(text) {
  // return Array – alla hashtags i texten, t.ex. ["#chas", "#frontend"]
  // använd regex för att hitta hashtags
  const regex = /#\w+/g;
  return text.match(regex) || [];
}

export function isValidSwedishZip(code) {
  // return Boolean – true om koden är giltigt svenskt postnummer ("12345" eller "123 45")
  // använd regex
  const regex = /^\d{3}\s?\d{2}$/;
  return regex.test(code);
}

export function maskEmails(text) {
  // return String – samma text men med maskerade e-postadresser
  // använd regex för att maskera användardelen (t.ex. u***@chas.se)
  const regex =
    /([a-zA-Z0-9._%+-])([a-zA-Z0-9._%+-]*)(@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  return text.replace(regex, (match, p1, p2, p3) => {
    return p1 + "*".repeat(p2.length) + p3;
  });
}

// ====== Rekursion ======
export function deepCountTags(items) {
  // return Number – antal taggar totalt, beräknat rekursivt
  let count = 0;
  for (const item of items) {
    if (Array.isArray(item.tags)) {
      count += item.tags.length;
    }
    if (Array.isArray(item.items)) {
      count += deepCountTags(item.items);
    }
  }
  return count;
}

export function factorial(n) {
  // return Number – n! (fakultet av n), beräknat rekursivt
  return n <= 1 ? 1 : n * factorial(n - 1);
}

export function findByIdRecursive(items, id) {
  // return Object | undefined – produkten med matchande id, annars undefined
  // sök rekursivt
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
    if (Array.isArray(item.items)) {
      const found = findByIdRecursive(item.items, id);
      if (found) {
        return found;
      }
    }
  }
}

// ====== Functional programming ======
export function setInStock(items, id, value) {
  // return Array – NY array med produkten uppdaterad (pure function)
  return items.map((item) =>
    item.id === id ? { ...item, inStock: value } : item
  );
}

export function curry(fn) {
  // return Function – curried version av en funktion
  return function curried(...arg) {
    if (arguments.length >= fn.length) {
      return fn(...arg);
    }
    return (...next) => curried(...arg, ...next);
  };
}

export const priceAtMost = (max) => (item) => item.price <= max;
// return Function – en predikatfunktion som kan användas i filter()
