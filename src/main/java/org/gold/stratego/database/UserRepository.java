package org.gold.stratego.database;
import org.springframework.data.repository.CrudRepository;
import org.gold.stratego.database.entities.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

}