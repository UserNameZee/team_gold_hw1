package org.gold.stratego.database;
import org.springframework.data.repository.CrudRepository;
import org.gold.stratego.database.entities.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}