export default class EntityNotFoundError extends Error {
  constructor(message = 'Entity is not in the tree') {
    super();
    this.name = 'EntityNotFound';
    this.message = message;
  }
}
