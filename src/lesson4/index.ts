class NodeTree {
  constructor(public value: number) {
      this.left = null;
      this.right = null;
  }

  public left: NodeTree | null;
  public right: NodeTree | null;
}

class Tree {
  private root: NodeTree | null;

  constructor() {
      this.root = null;
  }

  public insert(value: number): void {
      if (this.root === null) {
          this.root = new NodeTree(value);
      } else {
          this._insert(value, this.root);
      }
  }

  public buildTree(values: number[]): void {
      this.root = null;
      for (const value of values) {
          this.insert(value);
      }
  }

  public findWithOneChild(): number[] {
      return this._findWithOneChild(this.root);
  }

  private _findWithOneChild(node: NodeTree | null): number[] {
      const result: number[] = [];
      let isOneChild = false;

      if (node?.left !== null) {
          result.push(...this._findWithOneChild(node!.left));
          isOneChild = !isOneChild;
      }
      if (node?.right !== null) {
          result.push(...this._findWithOneChild(node!.right));
          isOneChild = !isOneChild;
      }

      if (isOneChild) {
          result.push(node!.value);
      }

      return result;
  }

  public findLeafs(): number[] {
      return this._findLeaf(this.root);
  }

  private _findLeaf(node: NodeTree | null): number[] {
      const result: number[] = [];
      if (node?.left === null && node?.right === null) {
          return [node!.value];
      }
      if (node?.left !== null) {
          result.push(...this._findLeaf(node!.left));
      }
      if (node?.right !== null) {
          result.push(...this._findLeaf(node!.right));
      }
      return result;
  }

  public isBalanced(): boolean {
      return this._isBalanced(this.root);
  }

  private _height(node: NodeTree | null): number {
      if (node === null) {
          return 0;
      }
      return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  private _isBalanced(node: NodeTree | null): boolean {
      if (node === null) {
          return true;
      }

      const leftHeight = this._height(node.left);
      const rightHeight = this._height(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
          return false;
      }

      return this._isBalanced(node.left) && this._isBalanced(node.right);
  }

  public printTree(): void {
      this._printTree(this.root);
  }

  private _printTree(node: NodeTree | null, level = 0): void {
      if (node !== null) {
          this._printTree(node.right, level + 1);
          console.log(' '.repeat(level), node.value);
          this._printTree(node.left, level + 1);
      }
  }

  private _insert(value: number, node: NodeTree): void {
      if (value < node.value) {
          if (node.left === null) {
              node.left = new NodeTree(value);
          } else {
              this._insert(value, node.left);
          }
      } else if (value > node.value) {
          if (node.right === null) {
              node.right = new NodeTree(value);
          } else {
              this._insert(value, node.right);
          }
      }
  }
}

// Пример использования
const tree = new Tree();
tree.buildTree([7, 3, 2, 1, 9, 5, 4, 6, 8, 0]);
console.log(tree.findWithOneChild());

// if tree.is_balanced() {
//     log('YES')
//  }
//   else{
//   log('NO')  
//  } 