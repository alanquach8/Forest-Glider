module managers
{
    export class Collision
    {
        public static AABBCheck(object1:objects.GameObject, object2:objects.GameObject)
        {
            let object1Offset = (!object1.isCentered) ? new objects.Vector2(0, 0) : new objects.Vector2(object1.halfWidth, object1.halfHeight);
            let object2Offset = (!object2.isCentered) ? new objects.Vector2(0, 0) : new objects.Vector2(object2.halfWidth, object2.halfHeight);

            let object1TopLeft = new objects.Vector2(object1.position.x - object1Offset.x, object1.position.y - object1Offset.y);
            let object2TopLeft = new objects.Vector2(object2.position.x - object2Offset.x, object2.position.y - object2Offset.y);

            // AABB Collision Detection
            if (object1TopLeft.x < object2TopLeft.x + object2.width &&
            object1TopLeft.x + object1.width > object2TopLeft.x &&
            object1TopLeft.y < object2TopLeft.y + object2.height &&
            object1TopLeft.y + object1.height > object2TopLeft.y) 
            {
                if(!object2.isColliding)
                {
                    console.log("Collision!");
                    object2.isColliding = true;

                    if(object1 instanceof objects.Player && object2 instanceof objects.Enemy)
                    {
                        if(!object1.Invincible)
                        {
                            object1.Life -= object2.Damage;
                            object1.GotHit();
                        }
                        object2.isColliding = false;
                    }
                    if(object1 instanceof objects.Player && object2 instanceof objects.Fireball)
                    {
                        if(!object1.Invincible)
                        {
                            object1.Life -= object2.Damage;
                            object1.GotHit();
                        }
                        object2.isColliding = false;
                    }
                    if(object1 instanceof objects.ThrowingStar && object2 instanceof objects.Enemy)
                    {
                        object2.Life -= object1.Damage;
                    }

                    if(object1 instanceof objects.Bomb && object2 instanceof objects.Enemy)
                    {
                        if(!object2.HitByExplosion)
                        {
                            object2.Life -= object1.Damage;
                            object2.HitByExplosion = true;
                            object1.Explode();
                        }
                    }
                    if(object1 instanceof objects.Explosion && object2 instanceof objects.Enemy)
                    {
                        if(!object2.HitByExplosion)
                        {
                            object2.Life -= object1.Damage;
                            object2.HitByExplosion = true;
                        }
                    }

                }
                
            }
            else
            {
                object2.isColliding = false;
            }
        }
        

    }
}