import { Pipe, PipeTransform } from '@angular/core';
import { GroupRole } from 'src/enums/group-role.enum';
import { GroupUtil } from 'src/utils/group.utils';

@Pipe({
  name: 'groupRole',
})
export class GroupRolePipe implements PipeTransform {
  constructor(private groupUtil: GroupUtil) {}

  public transform(
    groupId: number | string | undefined,
    groupRole: GroupRole
  ): boolean {
    // if group id is just a number
    if (groupId) {
      const parsed = Number.parseInt(groupId.toString());
      if (parsed !== undefined && !Number.isNaN(parsed)) {
        return this.groupUtil.hasGroupAccess(parsed, groupRole);
      }
    } else {
      return true;
    }

    return false;
  }
}
