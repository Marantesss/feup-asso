import exec from 'child_process';
import util from 'util';
import NodeAnnotation from '../NodeAnnotation';

import NodeComponent from '../NodeComponent';
import NodePackage from '../NodePackage';
import NodeVisitor from '../NodeVisitor';

class NodeAuditVisitor extends NodeVisitor {
  private auditResult: any = {};

  private parsedResult: any = {};

  private requiresAnalysis: boolean = false;

  public async build(projectPath: string) {
    const ex = util.promisify(exec.exec);

    try {
      await ex('npm audit --json', { cwd: projectPath });
    } catch (error) {
      this.auditResult = JSON.parse(error.stdout);
      this.requiresAnalysis = true;

      for (const key of Object.keys(this.auditResult.advisories)) {
        if (!this.parsedResult[this.auditResult.advisories[key].module_name]) {
          this.parsedResult[this.auditResult.advisories[key].module_name] = [this.auditResult.advisories[key]];
        } else {
          this.parsedResult[this.auditResult.advisories[key].module_name].push(this.auditResult.advisories[key]);
        }
      }
    }
  }

  public findProblems(name: string): NodeAnnotation[] {
    if (!this.requiresAnalysis || !this.parsedResult[name]) {
      return [];
    }

    const annotations: NodeAnnotation[] = [];

    for (const info of this.parsedResult[name]) {
      annotations.push(new NodeAnnotation('Security', info.title));
    }

    return annotations;
  }

  public visitPackage(pack: NodePackage): void {
    if (!pack.isNpm) {
      return;
    }

    const annotations: NodeAnnotation[] = this.findProblems(pack.getName());
    annotations.forEach((annotation) => pack.addAnnotation(annotation));
  }

  public visitComponent(component: NodeComponent): void {
    // pass
  }
}

export default NodeAuditVisitor;
