import { StackInspector } from '../vendored/assert';
import { filterLogicalId, formatFailure, matchSection } from './section';

export function findMappings(inspector: StackInspector, logicalId: string, props: any = {}): { [key: string]: { [key: string]: any } } {
  const section: { [key: string] : {} } = inspector.value.Mappings;
  const result = matchSection(filterLogicalId(section, logicalId), props);

  if (!result.match) {
    return {};
  }

  return result.matches;
}

export function hasMapping(inspector: StackInspector, logicalId: string, props: any): string | void {
  const section: { [key: string]: {} } = inspector.value.Mappings;
  const result = matchSection(filterLogicalId(section, logicalId), props);

  if (result.match) {
    return;
  }

  if (result.closestResult === undefined) {
    return 'No mappings found in the template';
  }

  return [
    `Template has ${result.analyzedCount} mappings, but none match as expected.`,
    formatFailure(result.closestResult),
  ].join('\n');
}