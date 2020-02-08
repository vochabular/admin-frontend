import odiff from "odiff";

/**
 * TODO(df): Create PR and export this in the odiff lib
 */
type odiffResultType = "set" | "unset" | "add" | "rm";

/**
 * TODO(df): Create PR and export this in the odiff lib
 */
interface odiffResult {
  type: odiffResultType;
  path: Array<string | number>;
  val: any;
  index: number;
  vals: any[];
  num: number;
}

/**
 * A (wrapper) class for deep comparison of two objects.
 * Once instantiated with an "old" and "new" object, the public CRUD properties can be accessed
 * Based on / Credits: https://stackoverflow.com/questions/8572826/generic-deep-diff-between-two-objects
 */
export default class Diff {
  /**
   * Input object 1 - The results of the comparison are relative to this object
   */
  oldObj: any;
  /**
   * Input object 2 - Will be compared to the "old" object
   */
  newObj: any;
  /**
   * The difference of the two constructor objects
   */
  diff: odiffResult[];

  constructor(oldObj: any, newObj: any) {
    this.oldObj = oldObj;
    this.newObj = newObj;
    this.diff = odiff(oldObj, newObj);
  }

  get created() {
    return this.filter(this.diff, "add");
  }

  get deleted() {
    return this.filter(this.diff, "rm");
  }

  get updated() {
    return this.filter(this.diff, "set");
  }

  get isEqual() {
    return (
      this.created.length + this.updated.length + this.deleted.length === 0
    );
  }

  private filter(input: odiffResult[], filter: odiffResultType) {
    return input.filter(e => e.type === filter);
  }
}
