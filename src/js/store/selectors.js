export const getCategories = ( state ) => state.categories.categories;

export const getPosts = ( state ) => state.posts.posts;

export const getActivePost = ( state ) => state.posts.activePost;

export const getActiveCategory = ( state ) => state.categories.activeCategory;

export const isSearching = ( state ) => state.search.isSearching;

export const getSearchTerm = ( state ) => state.search.searchTerm;

export const getSearchResults = ( state ) => state.search.searchResults;
