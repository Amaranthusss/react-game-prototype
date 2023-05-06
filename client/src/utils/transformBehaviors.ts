import * as YUKA from 'yuka'
import _ from 'lodash'

/**
 * Transforms behaviors list from YUKA steering manager to object
 */

export function transformBehaviors(steering: YUKA.SteeringManager): {
  followPath: YUKA.FollowPathBehavior | null
  seek: YUKA.SeekBehavior | null
  obstacleAvoidance: YUKA.ObstacleAvoidanceBehavior | null
} {
  return {
    followPath:
      (_.find(
        steering.behaviors,
        (behavior) => behavior instanceof YUKA.FollowPathBehavior
      ) as YUKA.FollowPathBehavior | null) ?? null,

    seek:
      (_.find(
        steering.behaviors,
        (behavior) => behavior instanceof YUKA.SeekBehavior
      ) as YUKA.SeekBehavior | null) ?? null,

    obstacleAvoidance:
      (_.find(
        steering.behaviors,
        (behavior) => behavior instanceof YUKA.ObstacleAvoidanceBehavior
      ) as YUKA.ObstacleAvoidanceBehavior | null) ?? null,
  }
}
